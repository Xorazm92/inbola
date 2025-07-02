#!/bin/bash

# INBOLA Test Script
echo "🧪 Testing INBOLA endpoints..."

BASE_URL="http://localhost:3001"

# Test health endpoint
echo "🔍 Testing health endpoint..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/health)
if [ $HEALTH_STATUS -eq 200 ]; then
    echo "✅ Health check: PASSED ($HEALTH_STATUS)"
else
    echo "❌ Health check: FAILED ($HEALTH_STATUS)"
fi

# Test main page
echo "🏠 Testing main page..."
MAIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)
if [ $MAIN_STATUS -eq 200 ]; then
    echo "✅ Main page: PASSED ($MAIN_STATUS)"
else
    echo "❌ Main page: FAILED ($MAIN_STATUS)"
fi

# Test products page
echo "🛍️ Testing products page..."
PRODUCTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/products)
if [ $PRODUCTS_STATUS -eq 200 ]; then
    echo "✅ Products page: PASSED ($PRODUCTS_STATUS)"
else
    echo "❌ Products page: FAILED ($PRODUCTS_STATUS)"
fi

# Test admin panel
echo "⚙️ Testing admin panel..."
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/sell)
if [ $ADMIN_STATUS -eq 200 ] || [ $ADMIN_STATUS -eq 302 ]; then
    echo "✅ Admin panel: PASSED ($ADMIN_STATUS)"
else
    echo "❌ Admin panel: FAILED ($ADMIN_STATUS)"
fi

echo "🎉 Test completed!"
