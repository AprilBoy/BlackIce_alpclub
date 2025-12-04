#!/bin/bash

# Script to generate self-signed SSL certificates for testing
# Usage: ./generate-ssl.sh [domain]

set -e

DOMAIN=${1:-localhost}
SSL_DIR="./ssl"
CERTS_DIR="$SSL_DIR/certs"
PRIVATE_DIR="$SSL_DIR/private"

echo "Generating self-signed SSL certificates for domain: $DOMAIN"

# Create SSL directories
mkdir -p "$CERTS_DIR" "$PRIVATE_DIR"

# Generate private key
echo "Generating private key..."
openssl genrsa -out "$PRIVATE_DIR/ssl-cert-snakeoil.key" 2048

# Generate certificate signing request
echo "Generating certificate signing request..."
openssl req -new -key "$PRIVATE_DIR/ssl-cert-snakeoil.key" \
    -out "$SSL_DIR/cert.csr" \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=BlackIce Alpclub/CN=$DOMAIN"

# Generate self-signed certificate
echo "Generating self-signed certificate..."
openssl x509 -req -days 365 -in "$SSL_DIR/cert.csr" \
    -signkey "$PRIVATE_DIR/ssl-cert-snakeoil.key" \
    -out "$CERTS_DIR/ssl-cert-snakeoil.pem"

# Clean up CSR file
rm -f "$SSL_DIR/cert.csr"

# Set proper permissions
chmod 600 "$PRIVATE_DIR/ssl-cert-snakeoil.key"
chmod 644 "$CERTS_DIR/ssl-cert-snakeoil.pem"

echo "SSL certificates generated successfully!"
echo "Certificate: $CERTS_DIR/ssl-cert-snakeoil.pem"
echo "Private key: $PRIVATE_DIR/ssl-cert-snakeoil.key"
echo ""
echo "To use with production certificates:"
echo "1. Place your certificate in $CERTS_DIR/ssl-cert-snakeoil.pem"
echo "2. Place your private key in $PRIVATE_DIR/ssl-cert-snakeoil.key"
echo "3. Or use Let's Encrypt with certbot for automatic certificates"
