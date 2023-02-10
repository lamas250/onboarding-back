data "archive_file" "api-archive" {
  source_dir  = "../lambdas/dist/"
  output_path = "files/onboarding.zip"
  type        = "zip"
}

resource "aws_lambda_function" "create" {
  environment {
    variables = {
      ONBOARDING_TABLE = aws_dynamodb_table.onboarding_table.name
    }
  }
  function_name = "create"
  handler       = "index.create"
  runtime       = "nodejs14.x"
  architectures = ["arm64"]
  role          = aws_iam_role.iam_for_lambda.arn

  filename         = data.archive_file.api-archive.output_path
  source_code_hash = data.archive_file.api-archive.output_base64sha256

  memory_size = "128"
  timeout     = 10

  layers = [aws_lambda_layer_version.joi.arn]
}

resource "aws_lambda_permission" "api_create" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.create.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:us-east-1:376671595923:*/*"
}


resource "aws_lambda_function" "get" {
  environment {
    variables = {
      ONBOARDING_TABLE = aws_dynamodb_table.onboarding_table.name
    }
  }
  function_name = "get"
  handler       = "index.get"
  runtime       = "nodejs14.x"
  architectures = ["arm64"]
  role          = aws_iam_role.iam_for_lambda.arn

  filename         = data.archive_file.api-archive.output_path
  source_code_hash = data.archive_file.api-archive.output_base64sha256

  memory_size = "128"
  timeout     = 10

  layers = [aws_lambda_layer_version.joi.arn]
}

resource "aws_lambda_permission" "api_get" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:us-east-1:376671595923:*/*"
}

resource "aws_lambda_function" "destroy" {
  environment {
    variables = {
      ONBOARDING_TABLE = aws_dynamodb_table.onboarding_table.name
    }
  }
  function_name = "destroy"
  handler       = "index.destroy"
  runtime       = "nodejs14.x"
  architectures = ["arm64"]
  role          = aws_iam_role.iam_for_lambda.arn

  filename         = data.archive_file.api-archive.output_path
  source_code_hash = data.archive_file.api-archive.output_base64sha256

  memory_size = "128"
  timeout     = 10

  layers = [aws_lambda_layer_version.joi.arn]
}

resource "aws_lambda_permission" "api_destroy" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.destroy.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:us-east-1:376671595923:*/*"
}