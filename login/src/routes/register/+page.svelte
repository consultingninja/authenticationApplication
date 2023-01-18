<script>
    import {goto} from '$app/navigation';
    let username = '';
    let password = '';
    let firstname = '';
    let lastname = '';
    let currentError = '';

    const register = ()=>{
        fetch('http://localhost:3030/api/register',{
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'content-type':  'application/json',
            },
            body: JSON.stringify({
                username: username,
                firstname: firstname,
                lastname: lastname,
                password: password,
            })
        })
        .then((res) =>{
            return res.json()
        })
        .then((data)=>{
            console.log(data);
            if(data.error === true) throw new Error(data.message);
        })
        .then( async()=>{
            await goto('/login',{noScroll: false, replaceState: true})
        })
        .catch((error)=>{
            currentError = error;
            console.log("Error registering",error)
        })
    }
</script>

<form on:submit|preventDefault={register}>
    <div>
        <label for="firstname">Firstname</label>
        <input type="text" id="firstname" bind:value={firstname}/>
    </div>
    <div>
        <label for="lastname">Lastname</label>
        <input type="text" id="lastname" bind:value={lastname}/>
    </div>
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" bind:value={username}/>
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password}/>
    </div>
    <button type='submit'>Submit</button>
    <div>
        <small>{currentError}</small>
    </div>

</form>

<style>
    div{
        color: #FFF;
        margin-bottom: .25em;
    }
    small{
      color: #ff0000;
    }
</style>