# stripe-tools

## Usage

### Options

#### `--config`

Use this to pass in the config options for stripe-tools, at present there is only one required item which is apikey
The value can either be a JSON string liek `--config '{"apikey": "jewgr67fgasiufg"}'` or a path to a JSON file such
as `--config @data.json`

### Commands

#### `customers`

The customers command will return a list of all your stripe customers in JSON format

Example usage: 
```
stripe-tools --config @data.json customers
```

