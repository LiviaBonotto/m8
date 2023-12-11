import unittest
import os
from app import app 

class TestFlaskApi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_upload_file(self):
        file_path = 'Nfe_assinada.xml'
        
        with open(file_path, 'rb') as xml_file:
            response = self.app.post('/upload', 
                                     content_type='multipart/form-data',
                                     data={'file': (xml_file, 'Nfe_assinada.xml')})
            
            self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
