import concurrent.futures
import requests
from pathlib import Path
import time
import matplotlib.pyplot as plt

API_URL = "http://127.0.0.1:5000/upload"


def upload_file(file_path):
    try:
        with open(file_path, 'rb') as file:
            files = {'file': file}
            response = requests.post(API_URL, files=files)
            print(response.status_code)
            return response.status_code, response.json()
    except Exception as e:
        return 500, {'error': str(e)}

def stress_test(num_requests):
    file_path = '../app/server/NFe_assinada.xml'

    successful_requests = 0
    start_time = time.time()

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(upload_file, file_path) for _ in range(num_requests)]

        for future in concurrent.futures.as_completed(futures):
            status_code, response_data = future.result()
            print(f"Status Code: {status_code}, Response: {response_data}")

            if status_code == 200:  
                successful_requests += 1

            # Adicione um pequeno tempo de espera entre as requisições
            time.sleep(0.1)

    elapsed_time = time.time() - start_time
    requests_per_minute = successful_requests / (elapsed_time / 60)

    print(f"Total de requisições bem-sucedidas: {successful_requests}")
    print(f"Taxa de requisições bem-sucedidas por minuto: {requests_per_minute:.2f}")

    # Gerar gráfico
    plt.bar(['Bem-sucedidas', 'Mal-sucedidas'], [successful_requests, num_requests - successful_requests])
    plt.title('Resultado do Teste de Estresse')
    plt.xlabel('Resultado')
    plt.ylabel('Número de Requisições')
    plt.show()

if __name__ == "__main__":
    num_requests = 1000
    stress_test(num_requests)
