process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


codegen:
	@npx squid-typeorm-codegen


typegen-khala:
	@npx squid-substrate-typegen typegenKhala.json
typegen-kusama:
	@npx squid-substrate-typegen typegenKusama.json
typegen-polkadot:
	@npx squid-substrate-typegen typegenPolkadot.json

typegen: typegen-khala typegen-kusama typegen-polkadot

up:
	@docker-compose up -d

down:
	@docker-compose down

deploy: codegen typegen-$(network)
	echo @API_DEBUG=true npx sqd squid update identities-$(network)@$(version) --source github.com/litentry/squid-identities.git#main -v -e NETWORK=$(network)

.PHONY: build serve process migrate codegen typegen up down
