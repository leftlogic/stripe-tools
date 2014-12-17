# stripe-tools

## Installation

This isn't on npm just yet installation can be done with:
```
$ git clone https://github.com/leftlogic/stripe-tools
$ cd stripe-tools
$ npm link
```

## Usage

### Options

#### `--config`

Use this to pass in the config options for stripe-tools, at present there is only one required item which is apikey
The value can either be a JSON string like `--config '{"apikey": "jewgr67fgasiufg"}'` or a path to a JSON file such
as `--config @data.json` or a plain apikey like `--config <apikey>`

### Commands

#### `auth`

The auth command will make it so you don't need to pass the `--config` flag each time

Example usage:
```
stripe-tools auth --config @data.json
```

#### `customers`

The customers command will return a list of all your stripe customers in JSON format

Example usage:
```
stripe-tools customers
```

#### `invoices`

The invoices command will return a list of all invoices for the given customer in JSON format

Example usage: 
```
stripe-tools invoices --customer <customer_id>
```

