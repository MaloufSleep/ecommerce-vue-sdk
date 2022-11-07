<template>
  <div class="mc-cart-wrap">
    <slot name="items" :items="cart.getItems()">
      <div class="mc-items">
        <transition name="fade">
          <div v-if="loading" class="mc-loader">
            <loading-icon class="mc-loading-icon" />
          </div>
        </transition>
        <div v-if="!cart.itemCount" class="mc-empty-cart">
          <p>There are no items in your cart!</p>
        </div>
        <div v-else v-for="(item, i) in sortedItems" :key="item.id" class="mc-item-wrap">
          <div class="mc-item">
            <button class="mc-btn-remove" @click="removeItem(item)"><span class="sr-only">Remove</span></button>
            <div class="mc-item-img-wrap">
              <g-link :to="item.link" aria-labelledby="mc-item-name">
                <img :src="item.image" alt="">
              </g-link>
            </div>
            <div class="mc-item-info">
              <g-link :to="item.link">
                <h4 class="mc-item-name">{{ item.product.properties.ShortTitle || item.product.properties.Title || item.product.name }}</h4>
              </g-link>
              <div class="mc-variation-list">
                {{ getVariationString(item) }}
              </div>
              <div class="mc-qty-wrap">
                <div class="mc-input-group">
                  <span>Qty</span>
                  <button class="mc-qty-btn mc-cart-btn mc-btn-minus" @click="adjustQuantity(item, -1)"><span class="sr-only">Decrease</span></button>
                  <label :for="`mc-qty_${i}`" class="sr-only">Item Quantity</label>
                  <input v-mask="'###'" type="text" class="mc-form-control" :id="`mc-qty_${i}`" @change="updateQuantity($event, item.id)" :value="item.quantity">
                  <button class="mc-qty-btn mc-cart-btn mc-btn-plus" @click="adjustQuantity(item, 1)"><span class="sr-only">Increase</span></button>
                </div>
                <div class="mc-product-pricing">
                  <p class="mc-product-price" v-if="checkFreeItem(item.totals.active, item.totals.discount)">FREE</p>
                  <p class="mc-product-price" v-else-if="getSalePrice(cart, item)">{{ getSalePrice(cart, item) | currency }}</p>
                  <p class="mc-product-price" :class="checkFreeItem(item.totals.active, item.totals.discount) || getSalePrice(cart, item) ? ' striked-price' : ''">{{ item.prices.active | currency }}</p>
                </div>          
              </div>      
            </div>
          </div>
          <div class="mc-item-promotions">
            <em v-if="itemHasPromotion(cart.promotions, item.discounts)"><p class="mc-item-promo">{{itemHasPromotion(cart.promotions, item.discounts).promo.description}}</p></em>
          </div>
          <div class="mc-item-alerts">
            <div class="alert alert-info mt-3 mb-0" v-if="item.backorder_quantity && showBackorderMessage(item.product.properties.ShowBackorderMsg)">
              This item is on backorder.<br>
              Order now for {{ getRestockDate(item.product.properties.RestockDate) }} delivery.
            </div>
          </div>
        </div>
      </div>
    </slot>
    <slot v-if="cart.shipping_address" name="address" :address="cart.shipping_address"></slot>
    <slot v-if="cart.shipping_service" name="shipping" :service="cart.shipping_service"></slot>
    <slot :cart="cart" name="cart">
      <hr>
      <div v-if="cart.itemCount > 0" class="mc-totals-wrap">
        <h2>Totals</h2>
        <div class="mc-totals">
          <p><span class="mc-total-property">Subtotal:</span> <span class="mc-total-value">{{ cart.totals.subtotal | currency}}</span></p>
          <p><span class="mc-total-property">Discount:</span> <span class="mc-total-value">{{ cart.totals.discount | currency}}</span></p>
          <p><span class="mc-total-property">Tax:</span> <span class="mc-total-value">{{ cart.totals.tax | currency }}</span></p>
          <p><span class="mc-total-property">Shipping:</span> <span class="mc-total-value">{{ cart.totals.shipping | currency}}</span></p>
          <p><span class="mc-total-property">Total:</span> <span class="mc-total-value">{{ cart.totals.total | currency}}</span></p>
        </div>
      </div>
    </slot>
    <div v-if="error">
      <p class="text-center" style="color: red">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'
import { startCase } from 'lodash'
import LoadingIcon from './LoadingIcon.vue'

export default {
    name: 'ec-cart-items',
    directives: {
      mask
    },
    components: {
      LoadingIcon
    },
    data(){
        return {
            loading: false,
            error: null,
        }
    },
    computed: {
        cart(){
          return this.$ecommerce.cart.getCart()
        },
        sortedItems(){
          // sorts items so that free items always show at bottom
          return this.cart.getItems().sort((a,b) => {
            if(a.totals?.active - a.totals?.discount <= 0) return 1
            if(b.totals?.active - b.totals?.discount <= 0) return -1
            return a.id - b.id
          })
        }
    },
    methods: {
        setLoading(value = false){
          this.loading = value
        },
        adjustQuantity(item, amount){
            this.error = null
            this.setLoading(true)
            this.$ecommerce.cart.updateItem(item.id, {quantity: item.quantity + amount}).catch(err => {
              this.error = err.message
            }).finally(() => {
              this.setLoading()
              this.$emit('cartUpdated')
            })
        },
        updateQuantity(event, id){
            this.error = null
            let quantity = parseInt(event.target.value)
            if(!quantity){
              this.$forceUpdate()
              return
            }
            this.setLoading(true)
            this.$ecommerce.cart.updateItem(id, {quantity: quantity}).catch(err => {
              this.error = err.message
            }).finally(() => {
              this.setLoading()
              this.$emit('cartUpdated')
            })
        },
        removeItem(item){
            this.setLoading(true)
            this.$ecommerce.cart.removeItems(item.id).finally(() => {
              this.setLoading()
              this.$emit('cartUpdated')
            })
        },
        getVariationString(item) {
          const variations = item.product.variations ? Object.values(item.product.variations) : []
          let varString = ''

          if (variations && variations.length > 0) {
            for (let [ind, variation] of variations.entries()) {
              varString += startCase(variation)
              if (ind < variations.length - 1 && variation.length > 0) {
                varString += ', '
              }
            }

            return varString
          }

          return ''
        },

        getRestockDate(restockDate = null){
          if(!restockDate){
            let now = new Date()
            now.setDate(now.getDate() + 21) // add 3 weeks by default
            return now.toLocaleString('default', {month: 'long', day: 'numeric'})
          }
          return restockDate
        },

        showBackorderMessage(showMessage = true) {
          return (showMessage === 'false') ? false : true
        },

        itemHasPromotion(promotions, discounts) {
          if (promotions && discounts) {
            for (let promo of promotions) {
              for (let discount of discounts) {
                if(promo.promotion.id == discount.promotion_id && !promo.code) return { promo: promo.promotion, discount: discount }
              }
            }
          }
        },

        checkFreeItem(total, discount) {
          let free = (total - discount) == 0
          return free
        },

        getSalePrice(cart, item) {
          let promotion = this.itemHasPromotion(cart.promotions, item.discounts)

          if (promotion) {
            if (promotion.promo.type_id == 5 || promotion.promo.type_id == 3) {
              return promotion.discount.unit_price
            }
          }
          
          return null
        }
    }
}
</script>

<style lang="scss" scoped>
.mc-cart-wrap {
  width: 100%;
}
.mc-items {
  position: relative;
  padding: 14px;

  & .mc-item-wrap {
    border: 1px solid gray;
    padding: 14px;
    margin-bottom: 1rem;
  }

  & .mc-item {
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;

    & h4 {
      font-size: 18px;
      font-weight: bold;
    }

    & .mc-variation-list {
      margin-bottom: 0.3rem;
    }
  }

  & .mc-item-info {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 4rem;
    flex: 1;
  }

  & .mc-item-promotions {
    display:flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    padding-top: 1rem;

    & p {
      margin: 0;
      width: auto;
      border-radius: 4px;
      font-size: 13px;
    }
  }
}

.mc-totals-wrap {
  padding: 1rem;

  & .mc-totals {

    & > p {
      display: flex;

      & .mc-total-property {
        flex: 1;
      }
    }
  }
}

.mc-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 101;
  opacity: 0.8;

  & .mc-loading-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.mc-btn-remove {
  height: 21px;
  width: 21px;
  font-size: 16px;
  line-height: 1px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  border: 1px solid gray;
  transition: all .1s ease;
  transform: translateX(-35%);

  &:before {
    content: "\2715";
  }

  &:hover {
    color: darken(gray, 12%);
    border-color: darken(gray, 12%);
    font-size: 21px;
  }
}

.mc-empty-cart {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > p {
    margin: 0;
  }
}

.mc-input-group {
  display: flex;
}

.mc-cart-btn, .mc-form-control {
  color: #495057;
  position: relative;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid grey;
  padding: .375rem .75rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  transition: color .15s ease-in-out,
              background-color .15s ease-in-out,
              border-color .15s ease-in-out,
              box-shadow .15s ease-in-out;
}

.mc-cart-btn {
  background-color: #e9ecef;

  &:hover, &:active {
    background-color: darken(#e9ecef, 7%);
  }
}

.mc-form-control {
  background-color: #fff;
  
  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
}

.mc-btn-minus:before {
  content: "\2212"
}
.mc-btn-plus:before {
  content: "\2b";
}

.mc-qty-wrap {
  display: flex;
  justify-content: space-between;

  & .mc-input-group > span {
    padding-right: 0.6rem;
  }

  & .mc-cart-btn, .mc-form-control {
    padding: 4px;
    height: 23px;
    width: 23px;
    line-height: 1px;
  }

  & .mc-form-control {
    font-size: 0.9rem;
    width: 35px;
  }

  & .mc-product-pricing {
    position: absolute;
    text-align: right;
    bottom: 0.25rem;
    right: 0.75rem;
    flex-direction: column;

    & .striked-price {
      color: grey;
      text-decoration: line-through;
    }
  }
}

.mc-item-img-wrap {
  background: gray;
  height: 85px;
  width: 85px;
  flex: 0 0 85px;
  display: inline-block;

  & img {
    width: 100%;
  }
}

.sr-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>