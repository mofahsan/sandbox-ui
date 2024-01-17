const config = `
protocol:
  search_route:
    mapping:
      - beckn_key: context.bap_id
        value: session.bap_id
      - beckn_key: context.bap_uri
        value: session.bap_uri
      - beckn_key: context.location.country.code
        value: session.country
      - beckn_key: context.location.city.code
        value: session.cityCode
      - beckn_key: context.transaction_id
        value: session.transaction_id
      - beckn_key: context.message_id
        value: messageId
      - beckn_key: context.timestamp
        value: timestamp
      - beckn_key: context.domain
        value: session.domain
      - beckn_key: context.version
        value: session.version
      - beckn_key: context.ttl
        value: session.ttl
      - beckn_key: context.action
        value: action

      - beckn_key: message.intent.fulfillment.vehicle.category
        value: data.vehicleCategaory || session.vehicleCategaory
      - beckn_key: message.intent.payment.tags
        value: data.paymentTags
        compute: buildTags(data.paymentTags)

  search_trip:
    mapping:
      - beckn_key: context.bap_id
        value: session.bap_id
      - beckn_key: context.bap_uri
        value: session.bap_uri
      - beckn_key: context.location.country.code
        value: session.country
      - beckn_key: context.location.city.code
        value: session.cityCode
      - beckn_key: context.transaction_id
        value: session.transaction_id
      - beckn_key: context.message_id
        value: messageId
      - beckn_key: context.timestamp
        value: timestamp
      - beckn_key: context.domain
        value: session.domain
      - beckn_key: context.version
        value: session.version
      - beckn_key: context.ttl
        value: session.ttl
      - beckn_key: context.action
        value: action

      - beckn_key: message.intent.fulfillment.stops[0].type
        value: startPoint
        check: data?.startStop
      - beckn_key: message.intent.fulfillment.stops[0].location.descriptor.code
        value: data?.startStop
      - beckn_key: message.intent.fulfillment.stops[1].type
        value: endPoint
        check: data?.endStop
      - beckn_key: message.intent.fulfillment.stops[1].location.descriptor.code
        value: data?.endStop

      - beckn_key: message.intent.fulfillment.vehicle.category
        value: data.vehicleCategaory || session.vehicleCategaory
      - beckn_key: message.intent.payment.tags
        value: data.paymentTags || session.paymentTags
        compute: buildTags(data.paymentTags || session.paymentTags)

  select:
    mapping:
      - beckn_key: context.bap_id
        value: session.bap_id
      - beckn_key: context.bap_uri
        value: session.bap_uri
      - beckn_key: context.bpp_id
        value: session.bpp_id
      - beckn_key: context.bpp_uri
        value: session.bpp_uri
      - beckn_key: context.location.country.code
        value: session.country
      - beckn_key: context.location.city.code
        value: session.cityCode
      - beckn_key: context.transaction_id
        value: session.transaction_id
      - beckn_key: context.message_id
        value: messageId
      - beckn_key: context.timestamp
        value: timestamp
      - beckn_key: context.domain
        value: session.domain
      - beckn_key: context.version
        value: session.version
      - beckn_key: context.ttl
        value: session.ttl
      - beckn_key: context.action
        value: action

      - beckn_key: message.order.items[0].id
        value: data.itemId
      - beckn_key: message.order.items[0].quantity.selected.count
        value: data.quantitySelected
      - beckn_key: message.order.provider.id
        value: data.providerId

  init:
    mapping:
      - beckn_key: context.bap_id
        value: session.bap_id
      - beckn_key: context.bap_uri
        value: session.bap_uri
      - beckn_key: context.bpp_id
        value: session.bpp_id
      - beckn_key: context.bpp_uri
        value: session.bpp_uri
      - beckn_key: context.location.country.code
        value: session.country
      - beckn_key: context.location.city.code
        value: session.cityCode
      - beckn_key: context.transaction_id
        value: session.transaction_id
      - beckn_key: context.message_id
        value: messageId
      - beckn_key: context.timestamp
        value: timestamp
      - beckn_key: context.domain
        value: session.domain
      - beckn_key: context.version
        value: session.version
      - beckn_key: context.ttl
        value: session.ttl
      - beckn_key: context.action
        value: action

      - beckn_key: message.order.items[0].id
        value: session.itemId
      - beckn_key: message.order.items[0].quantity.selected.count
        value: session.quantitySelected
      - beckn_key: message.order.provider.id
        value: session.providerId

      - beckn_key: message.order.billing.name
        value: data.billinginfo.name
      - beckn_key: message.order.billing.email
        value: data.billinginfo.email
      - beckn_key: message.order.billing.phone
        value: data.billinginfo.phone
      - beckn_key: message.order.payments[0].collected_by
        value: data.paymentData.collectedBy
      - beckn_key: message.order.payments[0].status
        value: data.paymentData.status
      - beckn_key: message.order.payments[0].type
        value: data.paymentData.type
      - beckn_key: message.order.payments[0].params.bank_code
        value: data.paymentData.bankCode
      - beckn_key: message.order.payments[0].params.bank_account_number
        value: data.paymentData.bankAccountNumber
      - beckn_key: message.order.payments[0].params.virtual_payment_address
        value: data.paymentData.virtualPaymentAddress
      - beckn_key: message.order.payments[0].tags
        value: data.paymentTags
        compute: buildTags(data.paymentTags)

  confirm:
    mapping:
      - beckn_key: context.bap_id
        value: session.bap_id
      - beckn_key: context.bap_uri
        value: session.bap_uri
      - beckn_key: context.bpp_id
        value: session.bpp_id
      - beckn_key: context.bpp_uri
        value: session.bpp_uri
      - beckn_key: context.location.country.code
        value: session.country
      - beckn_key: context.location.city.code
        value: session.cityCode
      - beckn_key: context.transaction_id
        value: session.transaction_id
      - beckn_key: context.message_id
        value: messageId
      - beckn_key: context.timestamp
        value: timestamp
      - beckn_key: context.domain
        value: session.domain
      - beckn_key: context.version
        value: session.version
      - beckn_key: context.ttl
        value: session.ttl
      - beckn_key: context.action
        value: action

      - beckn_key: message.order.items[0].id
        value: session.itemId
      - beckn_key: message.order.items[0].quantity.selected.count
        value: session.quantitySelected
      - beckn_key: message.order.provider.id
        value: session.providerId

      - beckn_key: message.order.billing.name
        value: session.billinginfo.name
      - beckn_key: message.order.billing.email
        value: session.billinginfo.email
      - beckn_key: message.order.billing.phone
        value: session.billinginfo.phone

      - beckn_key: message.order.payments[0].id
        value: data.paymentData.id
      - beckn_key: message.order.payments[0].collected_by
        value: data.paymentData.collectedBy
      - beckn_key: message.order.payments[0].status
        value: data.paymentData.status
      - beckn_key: message.order.payments[0].type
        value: data.paymentData.type
      - beckn_key: message.order.payments[0].params.transaction_id
        value: data.paymentData.transactionId
      - beckn_key: message.order.payments[0].params.currency
        value: data.paymentData.currency
      - beckn_key: message.order.payments[0].params.amount
        value: data.paymentData.amount
      - beckn_key: message.order.payments[0].tags
        value: data.paymentTags
        compute: buildTags(data.paymentTags)

  status:
    mapping:
      - beckn_key: context.bap_id
        value: session.bap_id
      - beckn_key: context.bap_uri
        value: session.bap_uri
      - beckn_key: context.bpp_id
        value: session.bpp_id
      - beckn_key: context.bpp_uri
        value: session.bpp_uri
      - beckn_key: context.location.country.code
        value: session.country
      - beckn_key: context.location.city.code
        value: session.cityCode
      - beckn_key: context.transaction_id
        value: session.transaction_id
      - beckn_key: context.message_id
        value: messageId
      - beckn_key: context.timestamp
        value: timestamp
      - beckn_key: context.domain
        value: session.domain
      - beckn_key: context.version
        value: session.version
      - beckn_key: context.ttl
        value: session.ttl
      - beckn_key: context.action
        value: action

      - beckn_key: message.order_id
        value: data.orderId

  on_search_route:
    mapping:
      - business_key: "name"
        value: "obj?.message?.catalog?.descriptor?.name"
      - business_key: "bpp_id"
        value: "obj?.context?.bpp_id"
      - business_key: "bpp_uri"
        value: "obj?.context?.bpp_uri"
      - business_key: "location"
        value:
          path: "obj?.message?.catalog?.providers"
          type: "Array"
          value:
            path: "obj.fulfillments"
            type: "Array"
            value:
              path: "obj.stops"
              type: "Array"
              value:
                path: "obj.location?.descriptor?.code || obj.location?.descriptor?.name"
                key: "lcoationName"
                type: "String"

  on_search_trip:
    mapping:
      - business_key: "name"
        value: "obj?.message?.catalog?.descriptor?.name"
      - business_key: "items"
        value:
          path: "obj?.message?.catalog?.providers"
          type: "Array"
          commanData:
            - business_key: "providerId"
              value: "obj.id"
          value:
            path: "obj.items"
            type: "Array"
            value:
              type: "Object"
              value:
                - key: "id"
                  value: "obj.id"
                - key: "name"
                  value: "obj.descriptor.name"

  on_select:
    mapping:
      - business_key: breakup
        value:
          path: obj.message.order.quote.breakup
          type: "Array"
          value:
            type: "Object"
            value:
              - key: "type"
                value: "obj.title"
              - key: "price"
                value: "obj.item.price.value + ' ' + obj.item.price.currency"
              - key: "quantity"
                value: "obj.item.quantity.selected.count"
              - key: "total"
                value: "obj.price.value + ' ' + obj.price.currency"

  on_init:
    mapping:
      - business_key: paymentDetails
        value: 
          path: obj.message.order.payments
          type: "Array"
          value:
            type: "Object"
            value:
              - key: "id"
                value: "obj.id"
              - key: "type"
                value: "obj.type"
              - key: "status"
                value: "obj.status"
             

  on_confirm:
    mapping:
      - business_key: "orderId"
        value: "obj.message.order.id"
      - business_key: "status"
        value: "obj.message.order.status"

  on_status:
    mapping:
      - business_key: "status"
        value: "obj.message.order.status"

`;

export default config;
