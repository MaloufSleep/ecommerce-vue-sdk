<template>
    <div>
        <slot v-bind:cart="{ items, totals, adjustQuantity, updateQuantity, removeItem }">
            <h3>Cart</h3>
            <div v-for="item in items.added" :key="item.id">
                <p>{{ item.name }}</p>
                <p>{{ item.price | currency }}</p>
                <div>
                    <button @click="adjustQuantity(item.id, 1)">Increase</button>
                    <button @click="adjustQuantity(item.id, -1)">Decrease</button>
                    <button @click="removeItem(item.id)">Remove</button>
                </div>
            </div>
            <br>
            <h3>Totals</h3>
            <div>
                <p>Subtotal: {{ totals.subtotal }}</p>
                <p>Discount: {{ totals.discount }}</p>
                <p>Tax: {{ totals.tax }}
                <p>Shipping: {{ totals.shipping }}<p>
                <p>Total: {{ totals.total }}</p>
            </div>
        </slot>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'ec-cart-items',
    computed: {
        ...mapState('cart',['items']),
        ...mapGetters('cart',['totals']),
    },
    methods: {
        adjustQuantity(id, amount){
            this.$services.cart.adjustQuantity(id, amount)
        },
        updateQuantity(id, quantity){
            this.$services.cart.updateQuantity(id, quantity)
        },
        removeItem(id){
            this.$services.cart.removeItem(id)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>