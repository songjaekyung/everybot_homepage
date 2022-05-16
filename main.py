from flask import Flask,render_template
import ssl

app = Flask(__name__)

@app.route('/')
def index():
     return render_template('index.html')

@app.route('/introduce')
def introduce():
    return render_template('introduce.html')

if __name__ == '__main__':
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    ssl_context.load_cert_chain(certfile='/etc/ssl/songjaekyung.crt', keyfile='/etc/ssl/songjaekyung.key', password='10244')
    app.run(host="0.0.0.0", port=443, ssl_context=ssl_context)
