const requestHandler = (req, res) => {

    const url = req.url
    const method = req.method
    const users = ['user1','user2','user3','user4','user5',]

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<body>')
        res.write('<h1>Greetings!</h1>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">SEND</button></form')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<body>')
        res.write('<ul>')
        users.map(user => {
            res.write(`<li>${user}</li>`)
        })
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/create-user' && method === 'POST') {
        
        const body = []

        req.on('data', (chunk) => { 
            body.push(chunk)
        }) 
        
        req.on('end', () => { 
            const parseBody = Buffer.concat(body).toString()
            const dataValue = parseBody.split('=')[1]
            console.log('Input value:', dataValue)
        })

        res.statusCode = 302
        res.setHeader('Location','/')
        return res.end()
    }

    // Default bonus
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<body>')
    res.write(`<h1>Page not found</h1>`)
    res.write('</body>')
    res.write('</html>')
    return res.end()
}

module.exports = requestHandler