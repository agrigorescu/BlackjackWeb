<template>
    <div>
        <nav>
            <div class="nav-wrapper">
                <img id="whiteLogo" src="img/bjWhite.png" alt="some text">
                <ul id="nav-mobile" class="right">
                    
                    <li><v-link href="/">Home</v-link></li>
                    <li><v-link href="/login">Login</v-link></li>
                    <li><v-link href="/registration">Registration</v-link></li>
                    <li><v-link href="/play">Play</v-link></li>
                    <li><v-link href="/accountinfo">Account</v-link></li>
                    <li><v-link href="/logout">Logout</v-link></li>
                    <!--<li><v-link href="/success?:username&:token">Success</v-link></li>-->

                </ul>
            </div>
        </nav>

        <slot></slot>
    </div>
</template>

<script>
    import VLink from '../components/VLink.vue'

    export default {
        components: {
            VLink
        }
    }
</script>