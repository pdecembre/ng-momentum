export class <%= classify(singularize(name)) %> {
<% Object.keys(JSON.parse(obj)).forEach(key => { %>
    /**
     * <%= key %>
     */
    <%= key %>: <%= JSON.parse(obj)[key] %>;
<% }) %>
}
