import { BigInt } from "@graphprotocol/graph-ts"
import { GenericEnsMapper, SubdomainClaimed } from "../generated/ClaimedSubdomains/GenericEnsMapper"
import { ClaimedSubdomain } from "../generated/schema"

export function handleSubdomainClaimed(event: SubdomainClaimed): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ClaimedSubdomain.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ClaimedSubdomain(event.transaction.from.toHex())
  }

  entity.timestamp = event.block.timestamp

  // Entity fields can be set based on event parameters
  entity.nftContract = event.params._nftContract
  entity.tokenId = event.params._tokenId
  entity.name = event.params._name

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.getPost(...)
  // - contract.newPost(...)
}
