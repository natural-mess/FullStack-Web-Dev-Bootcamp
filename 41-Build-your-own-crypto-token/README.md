# Solutions to problems 
## Resolve npm error
Try running these commands:
`npm install --legacy-peer-deps` or `npm install --force`

or to Manually Resolve the Conflict:

Open your package.json file and check the conflicting dependencies (@dfinity/agent and @dfinity/auth-client in this case).

Update the dependency versions to compatible ones. For example:

```json
"@dfinity/agent": "^0.10.4",
"@dfinity/auth-client": "^0.10.3"
```

After editing, run:

`npm install`

## Security key
https://www.windowscentral.com/how-create-usb-security-key-windows-10

If laptop does not have fingerprint sensor

Are you actually able to send webpages from your laptop to your phone? I.e. when you click this Chrome button on your laptop, does your phone show up on the list?
![alt text](image.png)

I followed your route (i.e. Android phone fingerprint as main device + Windows laptop as second device) and it appears that the ICP identity setup is a bit buggy.

Here's what worked:

1. Update Chrome

2. Login to the identity website on your phone

3. Don't click the "add new device" button

4. Open the identity website on your laptop and click "Already have an anchor but using a new device"

5. Enter the anchor, then add the alias

6. It's at this point things get buggy. Your phone should come up as an option (or an option to add your phone) but instead you're seeing "Use your security key".

7. Click the Cancel button instead of the Back button and hopefully it should come up