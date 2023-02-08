resource "aws_apigatewayv2_api" "this" {
  name          = "onboarding-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "this" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "onboarding_create" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.create.invoke_arn
}

resource "aws_apigatewayv2_route" "onboarding_create" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /v1/onboarding"
  target    = "integrations/${aws_apigatewayv2_integration.onboarding_create.id}"
}