output "api_url" {
  value = aws_apigatewayv2_stage.this.invoke_url
}

output "layer" {
  value = [{
    joi = {
      arn  = aws_lambda_layer_version.joi.arn
      name = aws_lambda_layer_version.joi.layer_name
    }
  }]
}

output "lambdas" {
  value = [{
    arn  = aws_lambda_function.create.arn
    name = aws_lambda_function.create.function_name
  }]
}