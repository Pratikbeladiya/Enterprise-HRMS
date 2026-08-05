curl -X POST https://razorpay.com \
  -u [YOUR_KEY_ID]:[YOUR_KEY_SECRET] \
  -H 'content-type: application/json' \
  -d '{
  "transfers": [
    {
      "account": "acc_IROu8Nod6PXPtZ",
      "amount": 100,
      "currency": "INR",
      "notes": {
        "name": "Vendor Name"
      },
      "on_hold": false
    }
  ]
}'
