import pika
import time 
from datetime import datetime

print(' Connecting to server ...')

try:
    connection = pika.BlockingConnection(pika.ConnectionParameters(host="rabbitmq"))
except pika.exceptions.AMQPConnectionError as exc:
    print("Failed to connect to RabbitMQ service. Message wont be sent.")

channel = connection.channel()
channel.queue_declare(queue='invoice_processing', durable=True)

print(' Waiting for messages...')

count = 0
def callback(ch, method, properties, body):
    global count
    time.sleep(3)
    print("Invoice Processed")
    print(datetime.now())
    count+=1
    print(str(count)+" invoices processed")

    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='invoice_processing', on_message_callback=callback)
channel.start_consuming()