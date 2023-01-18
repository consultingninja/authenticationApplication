<script>
    import {goto} from '$app/navigation';
    import user from '../user';
    $: isLoggedIn = $user === null? false : true;

    const logout = async()=>{
        await fetch('http://localhost:3030/api/logout',{
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'content-type':  'application/json',
            }
        })
        user.update(val => val = null);
        await goto('/',{noScroll: false,replaceState: true});
    }

</script>

<nav class='navbar'>
    <a class="nav_link" href="/">Home</a>
    {#if isLoggedIn === false}
    <a class="nav_link" href="/login">Login</a>
    <a class="nav_link" href="/register">Register</a>
    {:else}
    <button on:click={logout}>Logout</button>
    {/if}

</nav>

<style>
    .navbar{
       display: flex;
       flex-direction: row;
       align-items: center;
       position: absolute;
   
    }
    .nav_link{
       text-decoration: none;
       font-size: 1.25em;
       color: #FC521A;
       margin: 0 1em;
   
    }
    .nav_link:hover{
       border-bottom: 2px solid #FC521A;
    }
   </style>