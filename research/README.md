# Описание каталога

Каталог содержит черновые версии алгоритмов на Python, перед переносом их в Go:

`afis.ipynb` - алгоритм на основе улучшения качества отпечатка и последующего сопоставления по SIFT (*не переносился в Go и показал неудовлетворительные результаты*).
`cnn_inference_refactored.py` - рефакторинг свёрточной нейросети от https://github.com/JinZhuXing/Fingerprint_TF.
`convert_minex_dataset.ipynb` - преобразование парного датасета https://github.com/usnistgov/minex/tree/master/minexiii/validation/validation_imagery_raw из бинарного "сырого" массива в PNG.
