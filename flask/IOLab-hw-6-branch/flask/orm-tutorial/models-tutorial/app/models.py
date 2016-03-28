from app import db

orders = db.Table('orders',
    db.Column('order_id', db.Integer, db.ForeignKey('order.id')),
    db.Column('customer_id', db.Integer, db.ForeignKey('customer.id'))
)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(60), unique=False)
    lname = db.Column(db.String(60), unique=False)
    company = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(120), unique=False)
    phone = db.Column(db.String(20), unique=False)
    addresses = db.relationship('Address', backref='customer', cascade='all, delete-orphan', lazy='dynamic')
    orders = db.relationship('Order', secondary=orders, backref=db.backref('customer', lazy='dynamic'))

    def __repr__(self):
        return '<Customer %r>' % self.id

# Your Address code should go here
class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    street_address = db.Column(db.String(120), unique=False)
    city = db.Column(db.String(20), unique=False)
    state = db.Column(db.String(5), unique=False)
    country = db.Column(db.String(60), unique=False)
    zip_code = db.Column(db.String(20), unique=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))

    def __repr__(self):
        return '<Address %r>' % self.id

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    num_parts_ordered = db.Column(db.String(60), unique=False)
    totalspent = db.Column(db.String(60), unique=False)

    def __repr__(self):
        return '<Address %r>' % self.id
