<template>
    <ul class="chat">
        <li class="left clearfix" v-for="message in messages">
            <div class="chat-body clearfix">
                <div class="header">
                    <strong class="primary-font">
                        {{ chat.user.name }}
                    </strong>
                </div>
                <p>
                    {{ chat.message }}
                </p>
            </div>
        </li>
    </ul>
</template>

<script>
  export default {
    props: ['chats']
  };
</script>