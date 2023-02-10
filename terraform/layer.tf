resource "null_resource" "install_layer_deps" {
  triggers = {
    "layer_build" = "../layers/joi/nodejs/package.json"
  }
  provisioner "local-exec" {
    working_dir = "../layers/joi/nodejs"
    command     = "npm install --production"
  }
}

data "archive_file" "joi_layer" {
  output_path = "files/joi-layer.zip"
  type        = "zip"
  source_dir  = "../layers/joi"

  depends_on = [
    null_resource.install_layer_deps
  ]
}

resource "aws_lambda_layer_version" "joi" {
  layer_name          = "joi-layer"
  description         = "joi: ^17.7.0"
  filename            = data.archive_file.joi_layer.output_path
  source_code_hash    = data.archive_file.joi_layer.output_base64sha256
  compatible_runtimes = ["nodejs14.x"]
}