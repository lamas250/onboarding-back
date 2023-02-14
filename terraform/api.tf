resource "aws_apigatewayv2_api" "this" {
  name          = "onboarding-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "this" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = "prod"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "onboarding_create" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.create.invoke_arn
}

resource "aws_apigatewayv2_route" "onboarding_get" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "GET /v1/onboarding"
  target    = "integrations/${aws_apigatewayv2_integration.onboarding_get.id}"
}


resource "aws_apigatewayv2_integration" "onboarding_get" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.get.invoke_arn
}


resource "aws_apigatewayv2_route" "onboarding_create" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "POST /v1/onboarding"
  target    = "integrations/${aws_apigatewayv2_integration.onboarding_create.id}"
}


resource "aws_apigatewayv2_integration" "onboarding_destroy" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  payload_format_version = "2.0"
  integration_uri        = aws_lambda_function.destroy.invoke_arn
}


resource "aws_apigatewayv2_route" "onboarding_destroy" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "DELETE /v1/onboarding/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.onboarding_destroy.id}"
}