import { Card } from "@stripe/stripe-js";
import { responseHandler } from "../utils/handlers";
import { stripeApiUrl, stripeApiVersion } from "../utils/constants";
import { getApiKey } from "../utils/store";

/**
 * Delete payment method from customer.
 *
 * @param sourceId - source or card id (see: https://stripe.com/docs/api/sources/object#source_object-id)
 * @param customerId - customer id (see: https://stripe.com/docs/api/customers/object#customer_object-id)
 * @param customerEphemeralKey - customer ephemeral key
 * @returns
 */
export const deleteSourceFromCustomer = async (
  sourceId: string,
  customerId: string,
  customerEphemeralKey: string
): Promise<Card | undefined> => {
  const stripeApiKey = getApiKey() as string;
  if (typeof stripeApiKey !== "string")
    throw new Error("Initialization failed.");

  // make request
  return await fetch(
    `${stripeApiUrl}/customers/${customerId}/sources/${sourceId}`,
    {
      headers: {
        Authorization: `Bearer ${customerEphemeralKey}`,
        "Stripe-Version": stripeApiVersion,
      },
      method: "DELETE",
    }
  ).then(responseHandler);
};