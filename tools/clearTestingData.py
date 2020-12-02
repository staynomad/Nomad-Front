from pymongo import MongoClient

password = 'vhomes2019'
dbname = 'VHomes'
client_name = 'mongodb+srv://vhomesgroup:' + password + '@cluster0.rmikc.mongodb.net/' + dbname + '?retryWrites=true&w=majority'
client = MongoClient(client_name)

db = client[dbname]
print("In database", dbname)
for collection in db.list_collection_names():
	drop = False
	while True:
		key = input("Drop collection " + collection + "? [y/n] ")
		if key == 'y':
			drop = True
			break
		elif key == 'n':
			drop = False
			break
		else:
			print("Invalid response, try again")

	if drop:
		db[collection].drop()

print("Here are the collections in", dbname, "now:")
for collection in db.list_collection_names():
	print(collection)

