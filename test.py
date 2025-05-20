import pdfplumber

# Đường dẫn đến file PDF
pdf_path = 'c:/Users/hyunk/Downloads/VHU - Báo cáo ĐATN 2025.pdf'

# Danh sách để lưu các thuật ngữ
terms = []

# Mở file PDF và trích xuất văn bản
with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            # Tách các từ trong văn bản
            words = text.split()
            # Lọc các thuật ngữ (giả sử thuật ngữ là các từ có chữ cái đầu viết hoa)
            for word in words:
                if word.istitle():  # Kiểm tra nếu từ có chữ cái đầu viết hoa
                    terms.append(word)

# Loại bỏ các thuật ngữ trùng lặp
unique_terms = list(set(terms))

# In ra danh sách các thuật ngữ
for term in unique_terms:
    print(term)