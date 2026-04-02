import qrcode

def generate_qr(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill='black', back_color='white')
    return img

if __name__ == '__main__':
    data = 'https://gita.edu.in/'
    img = generate_qr(data)
    img.save('id_card_qr.png')