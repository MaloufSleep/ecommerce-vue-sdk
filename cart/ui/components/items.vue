<template>
  <div class="mc-cart-wrap">
    <slot :items="cart.getItems()" name="items">
      <div class="mc-items">
        <transition name="fade">
          <div v-if="loading" class="mc-loader"></div>
        </transition>
        <div v-if="!cart.itemCount" class="mc-empty-cart">
          <p>There are no items in your cart!</p>
        </div>
        <div v-else v-for="(item, i) in cart.getItems()" :key="item.id" class="mc-item">
          <button class="mc-btn-remove" @click="removeItem(item)"><span class="sr-only">Remove</span></button>
          <div class="mc-item-img-wrap">
            <g-link :to="item.link">
              <img :src="item.image">
            </g-link>
          </div>
          <div class="mc-item-info">
            <g-link :to="item.link">
              <h4>{{ item.product.properties.Title || item.product.name }}</h4>
            </g-link>
            <div class="mc-qty-wrap">
              <div class="mc-input-group">
                <span>Qty</span>
                <button class="mc-qty-btn mc-cart-btn mc-btn-minus" @click="adjustQuantity(item, -1)"><span class="sr-only">Decrease</span></button>
                <label :for="`mc-qty_${i}`" class="sr-only">Item Quantity</label>
                <input type="text" class="mc-form-control" :id="`mc-qty_${i}`" @change="updateQuantity(item)" v-model="item.quantity">
                <button class="mc-qty-btn mc-cart-btn mc-btn-plus" @click="adjustQuantity(item, 1)"><span class="sr-only">Increase</span></button>
              </div>
              <p class="mc-product-price">{{ item.prices.active | currency }}</p>
            </div>
          </div>
        </div>
      </div>
    </slot>

    <slot
      :cart="cart"
      name="cart"
    >
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
  </div>
</template>

<script>

export default {
    name: 'ec-cart-items',
    data(){
        return {
            loading: false
        }
    },
    computed: {
        cart(){
            return this.$ecommerce.cart.getCart()
        }
    },
    methods: {
        setLoading(value = false){
            this.loading = value
        },
        adjustQuantity(item, amount){
            this.setLoading(true)
            this.$ecommerce.cart.updateItem(item.id, {quantity: item.quantity + amount}).finally(this.setLoading)
        },
        updateQuantity(item){
            this.setLoading(true)
            this.$ecommerce.cart.updateItem(item.id, {quantity: item.quantity}).finally(this.setLoading)
        },
        removeItem(item){
            this.setLoading(true)
            this.$ecommerce.cart.removeItems(item.id).finally(this.setLoading)
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
  padding: 1rem;

  & .mc-item {
    border: 1px solid gray;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    padding: 1rem;
    margin-bottom: 1rem;

    & h4 {
      font-size: 18px;
      font-weight: bold;
    }
  }

  & .mc-item-info {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    flex: 1;
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
  width: 100%; height: 100%;
  background: white;
  z-index: 101;
  opacity: 0.8;
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
    padding: .375rem;
    height: 23px;
    width: 23px;
    line-height: 1px;
  }

  & .mc-form-control {
    font-size: 0.9rem;
    width: 2.5rem;
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