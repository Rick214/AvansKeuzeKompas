<script lang="ts">
	import { goto } from '$app/navigation';

	// Add login/session functionality later
	goto('/login');

    let userInput = '';

    function showInput() {
        const div = document.getElementById('output');
        // 🚨 Onveilige DOM injectie
        div!.innerHTML = "Je invoer: " + userInput;
    }
</script>

<input bind:value={userInput} placeholder="Type iets..." />
<button on:click={showInput}>Laat zien</button>
<div id="output"></div>
