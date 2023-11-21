from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from xml.etree import ElementTree as ET


app = Flask(__name__)

# Allow all domains to access this service
CORS(app, resources={r"*": {"origins": "*"}})


namespaces = {'nfe': 'http://www.portalfiscal.inf.br/nfe'}


@app.route('/')
def index():
    return 'Hello World!'


@app.route("/upload", methods=['POST'])
def upload_file():
    response = get_xml_data(request.files['file'])

    return response, 200


def get_xml_data(file):
    if file.filename == '':
        return jsonify(error="Nenhum arquivo selecionado."), 400

    content = file.read()

    root = ET.fromstring(content)
    nat_op = root.find('.//nfe:natOp', namespaces)
    verProc = root.find('.//nfe:xNome', namespaces)
    cnpj_vend = root.find('.//nfe:CNPJ', namespaces)
    destinatario = root.find('.//nfe:xNome', namespaces)
    cnpj_dest = root.find('.//nfe:infNFe/nfe:dest/nfe:CNPJ', namespaces)
    produto = root.find('.//nfe:prod/nfe:xProd', namespaces)
    valor_unidade = root.find('.//nfe:prod/nfe:vUnCom', namespaces)
    valor_total = root.find('.//nfe:prod/nfe:vProd', namespaces)
    quantidade = root.find('.//nfe:prod/nfe:qCom', namespaces)

    response = {
        "natureza_operacao": nat_op.text,
        "Vendedor": verProc.text,
        "CNPJ_vend": cnpj_vend.text,
        "destinatario": destinatario.text,
        "CNPJ_dest": cnpj_dest.text,
        "produto": produto.text,
        "valor_unidade": valor_unidade.text,
        "valor_total": valor_total.text,
        "quantidade": quantidade.text
    }

    return response


if __name__ == '__main__':
    app.run(debug=True, port=5000)
