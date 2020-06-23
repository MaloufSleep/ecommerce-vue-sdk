<template>
    <div>
        <slot v-bind:cart="cart">
            <h2>Items</h2>
            <div class="items" v-if="cart.items">
                <transition name="fade">
                    <div v-if="loading" class="loader"></div>
                </transition>
                <div v-if="cart.items.length == 0">
                    <p>There are no items in your cart!</p>
                </div>
                <div v-for="item in cart.items" :key="item.id">
                    <h4>{{ item.name }}</h4>
                    <p>Unit Price: {{ item.price | currency }}</p>
                    <p>Quantity: {{ item.quantity }}</p>
                    <button @click="adjustQuantity(item, -1)">Decrease</button>
                    <button @click="adjustQuantity(item, 1)">Increase</button>
                    <button @click="removeItem(item)">Remove</button>
                </div>
            </div>
            <br><hr><br>
            <h2>Totals</h2>
            <div>
                <p>Subtotal: {{ cart.subtotal | currency}}</p>
                <p>Discount: {{ cart.discount | currency}}</p>
                <p>Tax: {{ cart.tax | currency}}
                <p>Shipping: {{ cart.shipping | currency}}<p>
                <p>Total: {{ cart.total | currency}}</p>
            </div>
            <br><br>
        </slot>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'ec-cart-items',
    data(){
        return {
            loading: false
        }
    },
    computed: {
        ...mapState(['cart']),
        ...mapGetters('cart',['itemCount']),
    },
    methods: {
        adjustQuantity(item, amount){
            this.loading = true
            this.$services.cart.updateQuantity(item.id, item.quantity + amount).then(res => {
                console.log(res)
                this.loading = false
            }).catch(err => {
                console.error(err)
                this.loading = false
            })
            
        },
        removeItem(item){
            this.loading = true
            this.$services.cart.removeItem(item.id).then(res => {
                console.log(res)
                this.loading = false
            }).catch(err => {
                console.error(err)
                this.loading = false
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .items{
        position: relative;
    }
    .loader {
        position: absolute;
        width: 100%; height: 100%;
        background: white;
        z-index: 101;
        opacity: 0.8;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
</style>