import { CallHandlerContext } from '@subsquid/substrate-processor';
import { hexToString } from '@polkadot/util';
import { Store } from '@subsquid/typeorm-store';

interface IdentityInfo {
  display: string | null;
  legal: string | null;
  web: string | null;
  riot: string | null;
  email: string | null;
  pgp: string | null;
  image: string | null;
  twitter: string | null;
}

const isRaw = (kind: string) => kind.slice(0,3) === 'Raw';

const isDecodeable = (property: {value: string, __kind: string} | undefined) => property && property.value && isRaw(property.__kind);

export function getIdentitySetIdentityCall(
  ctx: CallHandlerContext<Store>
): IdentityInfo {
  const { info } = ctx.call.args as any;

  return {
    display: isDecodeable(info.display) ? hexToString(info.display.value) : null,
    email: isDecodeable(info.email) ? hexToString(info.email.value) : null,
    image: isDecodeable(info.image) ? hexToString(info.image.value) : null,
    legal: isDecodeable(info.legal) ? hexToString(info.legal.value) : null,
    pgp: info.pgp?.toString() ?? undefined,
    riot: isDecodeable(info.riot) ? hexToString(info.riot.value) : null,
    twitter: isDecodeable(info.twitter) ? hexToString(info.twitter.value) : null,
    web: isDecodeable(info.web) ? hexToString(info.web.value) : null,
  };
}
