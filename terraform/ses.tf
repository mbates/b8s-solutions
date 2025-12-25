# =============================================================================
# SES Configuration for Contact Form Email
# =============================================================================

# SES Domain Identity
resource "aws_ses_domain_identity" "main" {
  domain = var.hosted_zone_name
}

# SES Domain Verification DNS Record
resource "aws_route53_record" "ses_verification" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "_amazonses.${var.hosted_zone_name}"
  type    = "TXT"
  ttl     = 600
  records = [aws_ses_domain_identity.main.verification_token]
}

# Wait for SES domain verification
resource "aws_ses_domain_identity_verification" "main" {
  domain = aws_ses_domain_identity.main.id

  depends_on = [aws_route53_record.ses_verification]
}

# =============================================================================
# DKIM Configuration (improves email deliverability)
# =============================================================================

resource "aws_ses_domain_dkim" "main" {
  domain = aws_ses_domain_identity.main.domain
}

# DKIM DNS Records
resource "aws_route53_record" "ses_dkim" {
  count   = 3
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "${aws_ses_domain_dkim.main.dkim_tokens[count.index]}._domainkey.${var.hosted_zone_name}"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_ses_domain_dkim.main.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

# =============================================================================
# SPF Record (helps prevent email spoofing)
# =============================================================================

# Note: This creates a TXT record for SPF. If you already have an SPF record,
# you may need to merge this with your existing record.
resource "aws_route53_record" "ses_spf" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.hosted_zone_name
  type    = "TXT"
  ttl     = 600
  records = ["v=spf1 include:amazonses.com ~all"]

  # Allow overwrite in case there's an existing SPF record
  allow_overwrite = true
}

# =============================================================================
# Mail From Domain (for better deliverability)
# =============================================================================

resource "aws_ses_domain_mail_from" "main" {
  domain           = aws_ses_domain_identity.main.domain
  mail_from_domain = "mail.${var.hosted_zone_name}"
}

# Mail From MX Record
resource "aws_route53_record" "ses_mail_from_mx" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.main.mail_from_domain
  type    = "MX"
  ttl     = 600
  records = ["10 feedback-smtp.${var.aws_region}.amazonses.com"]
}

# Mail From SPF Record
resource "aws_route53_record" "ses_mail_from_spf" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.main.mail_from_domain
  type    = "TXT"
  ttl     = 600
  records = ["v=spf1 include:amazonses.com ~all"]
}

# =============================================================================
# DMARC Record (recommended for email security)
# =============================================================================

resource "aws_route53_record" "ses_dmarc" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "_dmarc.${var.hosted_zone_name}"
  type    = "TXT"
  ttl     = 600
  records = ["v=DMARC1; p=none; rua=mailto:${var.contact_email}"]
}
