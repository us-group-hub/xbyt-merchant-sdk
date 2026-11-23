<?php
declare(strict_types=1);

/**
 * Example: Create an XBYT Merchant Gateway Invoice (PHP 8.1+)
 * Docs: https://xbyt.org/docs_api.php
 */

$apiKey = getenv('XBYT_API_KEY') ?: 'YOUR_XBYT_API_KEY';

$payload = [
    'amount'       => 25.00,
    'order_id'     => 'ORD-' . time(),
    'description'  => 'Digital Service Order',
    'return_url'   => 'https://your-shop.example/payment-return.php',
    'callback_url' => 'https://your-shop.example/verify_webhook.php',
];

$ch = curl_init('https://xbyt.org/api/merchant/create_invoice.php');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'X-Api-Key: ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS     => json_encode($payload, JSON_THROW_ON_ERROR),
]);

$response = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || $response === false) {
    throw new RuntimeException('XBYT create_invoice failed with HTTP ' . $httpCode);
}

$data = json_decode($response, true, 512, JSON_THROW_ON_ERROR);
echo 'Checkout URL: ' . ($data['checkout_url'] ?? '') . PHP_EOL;
