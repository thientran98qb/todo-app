<template>
    <div class="nav">
        <div class="container nav__inner">
            <div class="nav__inner--logo">
                <img alt="Vue logo" src="../../assets/logo.png">
            </div>
            <div class="nav__inner--lists">
                <ul>
                    <li>Home</li>
                    <li>Todo</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.nav {
    background-color: antiquewhite;
    background-image: linear-gradient(90deg, #501aa8,#870de8);
    color: #fff;
    &__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &--logo {
            img {
                display: block;
                width: 50px;
                height: 50px;
            }
        }
        &--lists {
            ul > li {
                display: inline-block;
                margin-right: 20px;
            }
        }
    }
}
</style>
