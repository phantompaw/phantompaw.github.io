const { createApp } = Vue;

createApp({
    data() {
        return {
            message: ''
        };
    },
    methods: {
        async sendMessage() {
            const response = await fetch('/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: this.message })
            });

            const result = await response.json();
            alert(result.message);
        }
    }
}).mount('#app');
