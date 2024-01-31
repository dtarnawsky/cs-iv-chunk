# Identity Vault Test

This app writes 1mb of data to Identtiy Vault when `Write` is clicked. It reads it back when `Read` is clicked and compares what was written vs read to verify the data is the same.

It also write to the console the amount of time taken to `setValue` and `getValue`.