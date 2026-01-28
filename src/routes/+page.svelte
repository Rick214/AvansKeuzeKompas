<script lang="ts">
    let userInput = '';

    function runCode() {
        eval(userInput);
    }

	import { goto } from '$app/navigation';

	// Add login/session functionality later
	goto('/login');
</script>

<input
    bind:value={userInput}
    placeholder="Typ JavaScript code..."
/>

<button on:click={runCode}>
    Run code
</button>
