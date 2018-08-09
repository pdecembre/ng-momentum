export class <%= classify(singularize(name)) %> {
    <% Object.keys(JSON.parse(obj)).forEach(key => { %>
        /**
         * <%= key %>
         */
        <%= key %>: <%= JSON.parse(obj)[key] %> = <%= (JSON.parse(obj)[key] === 'number') ? '-1' : (JSON.parse(obj)[key] === 'boolean') ? 'false' : 'null' %>;
        <% }) %>
}