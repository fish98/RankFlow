import json
import numpy as np
from scipy.stats import pearsonr
import os
from sklearn.manifold import TSNE


def creat_json():
	file = '..\.\src\pages\index\year_data.json'
	# file_object = open(file, 'r')
	with open(file, encoding = 'utf-8') as f:
		data = json.load(f)
	year_arr = []
	years = {}
	count = 0
	for i in range(2004, 2017):
		year_arr.append(str(i))
		years[str(i)] = count
		count += 1

	eles_arr = ["HIS", "ICC", "H", "aggre_constraint", "clust_coef", "betweenness", "effective_size", "local_effic",
	            "pagerank", "MaxD"]
	eles = {}
	for i in range(len(eles_arr)):
		eles[eles_arr[i]] = i
	name_arr = []
	names = {}
	count = 0
	obj = {}
	for year in data.keys():
		for name in data[year]['obj'].keys():
			if name not in names:
				name_arr.append(name)
				names[name] = len(name_arr) - 1
				obj[name] = {'sum': 0, 'count': 0}
			mean = data[year]['obj'][name]['mean']
			varianceSqrt = data[year]['obj'][name]['varianceSqrt']
			if year not in obj[name]:
				obj[name][year] = {'mean': mean, 'varianceSqrt': varianceSqrt}
				obj[name]['sum'] += mean + varianceSqrt
				obj[name]['count'] += 1
	res = np.empty((len(name_arr), len(year_arr) * 2))
	res.fill(0)
	for name in obj.keys():
		for year in obj[name].keys():
			if year == 'sum' or year == 'count':
				continue
			mean = obj[name][year]['mean']
			varianceSqrt = obj[name][year]['varianceSqrt']
			res[names[name]][years[year] * 2] = mean
			res[names[name]][years[year] * 2 + 1] = varianceSqrt
	rows, lines = np.where(res == 0)
	for i in range(len(rows)):
		row = rows[i]
		line = lines[i]
		t = obj[name_arr[row]]
		res[row][line] = t['sum'] / t['count']
	np.savetxt('./data/university_vectors', res)
	f = open('./data/university_name.json', 'w', encoding = 'utf-8')
	json.dump(names, f, ensure_ascii = False)
	f.close()
	return data


def load_json():
	file = './data/university_name.json'
	# file_object = open(file, 'r')
	with open(file, encoding = 'utf-8') as f:
		names = json.load(f)
	res = np.loadtxt('./data/university_vectors')
	X_embedded = TSNE(n_components = 2).fit_transform(res)

	obj = {}
	for name in names.keys():
		index = names[name]
		obj[name] = list(map(lambda x: float(x), X_embedded[index]))
		obj[name] = {'id': name, 'index': index, 'x': float(X_embedded[index][0]), 'y': float(X_embedded[index][1])}
	f = open('./data/university_tsne.json', 'w', encoding = 'utf-8')
	json.dump(obj, f, ensure_ascii = False)
	f.close()

	return 1


if __name__ == '__main__':  # 当本模块被直接启动时才运行
	res = load_json()
