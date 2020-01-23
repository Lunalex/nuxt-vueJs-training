<template>
    <div class="row justify-content-center">
        <div class="col-11">
            <div class="row justify-content-center">
                <h2 class="text-center my-4">My Account</h2>
            </div>
            <div class="row justify-content-around">
                <user />
                <user-client />
                <user-collaborator />
            </div>
        </div>
    </div>
</template>

<script>
import User from "~/components/User.vue"
import User_client from "~/components/User_client.vue"
import User_collaborator from "~/components/User_collaborator.vue"
export default {
    components: {
        user: User,
        "user-client": User_client,
        "user-collaborator": User_collaborator
    }
}
</script>

<style>
.parameter-name {
    text-align: right;
    font-weight: bold;
}

.parameter-value {
    text-align: start;
}
</style>