var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const users = [];
function fetchUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.github.com/users/${username}`);
        const user = yield response.json();
        if (user.message) {
            alert('Usuário não encontrado!');
        }
        else {
            users.push(user);
            alert(`O usuário ${user.login} foi salvo.\n` +
                `\nid: ${user.id}` +
                `\nlogin: ${user.login}` +
                `\nNome: ${user.name}` +
                `\nBio: ${user.bio}` +
                `\nRepositórios públicos: ${user.public_repos}`);
        }
    });
}
function showUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = users.find(user => user.login === username);
        if (typeof user === 'undefined') {
            alert('Usuário não encontrado!');
        }
        else {
            const response = yield fetch(user.repos_url);
            const repos = yield response.json();
            let message = `id: ${user.id}\n` +
                `\nlogin: ${user.login}` +
                `\nNome: ${user.name}` +
                `\nBio: ${user.bio}` +
                `\nRepositórios públicos: ${user.public_repos}`;
            repos.forEach(repo => {
                message += `\nNome: ${repo.name}` +
                    `\nDescrição: ${repo.description}` +
                    `\nEstrelas: ${repo.stargazers_count}` +
                    `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`;
            });
            alert(message);
        }
    });
}
function showAllUsers() {
    let message = 'Usuários:\n';
    users.forEach(user => {
        message += `\n- ${user.login}`;
    });
    alert(message);
}
function showReposTotal() {
    const reposTotal = users.reduce((accumulator, user) => (accumulator + user.public_repos), 0);
    alert(`O grupo possui um total de ${reposTotal} repositórios públicos!`);
}
function showTopFive() {
    const topFive = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5);
    let message = 'Top 5 usuários com mais repositórios públicos:\n';
    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios`;
    });
    alert(message);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchUser('arthuuralb');
        yield fetchUser('julianaconde');
        yield fetchUser('pcaldass');
        yield fetchUser('lucasqueirogaa');
        yield fetchUser('frans203');
        yield fetchUser('LeDragoX');
        yield showUser('isaacpontes');
        yield showUser('julianaconde');
        showAllUsers();
        showReposTotal();
        showTopFive();
    });
}
main();
