# DynamoDB Resource
resource "aws_dynamodb_table" "onboarding_table" {
  name           = "onboarding-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = "5"
  write_capacity = "5"
  attribute {
    name = "id"
    type = "S"
  }
  hash_key = "id"
}
