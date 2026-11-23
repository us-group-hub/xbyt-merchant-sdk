<?php
declare(strict_types=1);

/**
 * Example: Verify XBYT HMAC-SHA256 Webhook Signature & Server-Side Status
 * Never trust browser return query parameters alone.
 */

$webhookSecret = getenv('XBYT_WEBHOOK_SECRET') ?: 'YOUR_WEBHOOK_SECRET';
$rawBody       = file_get_contents('php://input') ?: '';
$signature     = (string) ($_SERVER['HTTP_X_XBYT_SIGNATURE'] ?? '');

$expected = hash_hmac('sha256', $rawBody, $webhookSecret);
if ($signature === '' || !hash_equals($expected, $signature)) {
    http_response_code(401);
    exit('Invalid signature');
}

$event = json_decode($rawBody, true);
if (!is_array($event) || empty($event['invoice_id'])) {
    http_response_code(400);
    exit('Malformed payload');
}

if (($event['status'] ?? '') === 'completed') {
    // Idempotently mark order as paid in your database using $event['order_id'] / $event['invoice_id']
}

http_response_code(200);
echo 'OK';
