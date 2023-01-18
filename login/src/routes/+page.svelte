<script>
    import {onMount} from 'svelte';
    import user from '../user';
    $: isLoggedIn = $user === null? false : true;

    onMount(async()=>{
        const userLoggedInStatus = async()=>{
            const result = await fetch('http://localhost:3030/api/user',{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'application/json'
                }
            })
            return result
        }
        const result = await userLoggedInStatus();
        const returnedData = await result.json();
        if(returnedData.success === true) user.update(val => val = returnedData.data)
    })



</script>

<div class="content_wrapper">
    <h1>Welcome to Consulting Ninja</h1>
    {#if isLoggedIn}
    <h2>Thank you {$user.firstname} {$user.lastname} for logging in!</h2>
    {:else}
    <h2>You need to be logged in here.</h2>
    <h2>Head to Sign in page or Register if you don't have an account.</h2>
    {/if}
</div>

<style>
    h1, h2{
        color: #FFF;
    }
    .content_wrapper{
        margin-top: 4em;
        text-align: center;
    }
</style>