# Security Checklist for Production Deployment

echo "🛡️  Running Security Checks..."

# Check if sensitive data exists in build files
echo "Checking for exposed credentials in build..."
if grep -r "storage.googleapis.com" dist/ 2>/dev/null; then
    echo "❌ WARNING: Found potential resume URL in build files!"
    echo "   Make sure VITE_RESUME_URL is properly configured."
else
    echo "✅ No exposed resume URLs found in build"
fi

# Check for password leaks
if grep -r "VITE_RESUME_PASSWORD" dist/ 2>/dev/null; then
    echo "❌ WARNING: Found password reference in build files!"
else
    echo "✅ No password leaks detected"
fi

# Check environment variables
if [ -z "$VITE_RESUME_URL" ]; then
    echo "⚠️  WARNING: VITE_RESUME_URL not set"
fi

if [ -z "$VITE_RESUME_PASSWORD" ]; then
    echo "⚠️  WARNING: VITE_RESUME_PASSWORD not set"
fi

echo "🔒 Security check complete!"
echo ""
echo "Production Security Recommendations:"
echo "1. Use HTTPS-only hosting"
echo "2. Set up proper CSP headers on your server"
echo "3. Enable HSTS (HTTP Strict Transport Security)"
echo "4. Consider using a serverless function for URL resolution"
echo "5. Monitor failed login attempts in Google Analytics"
