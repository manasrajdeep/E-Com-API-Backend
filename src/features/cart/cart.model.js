

//product,userId,quantity
export default class cartItemModel{
    constructor (product,userId,quantity,id){
        this.product=product;
        this.userId=userId;
        this.quantity=quantity;
        this.id=id
    }
    static add(product,userId,quantity){
        const cartItem=new cartItemModel(product,userId,quantity);
        cartItem.id=cartItems.length+1;
        cartItems.push(cartItem);
        return cartItem;
    }
    static get(userId){
        const userItem=cartItems.filter(item=>item.userId==userId);
        return userItem;
    }
    static delete(id, userId){
        const cartItemIndex=cartItems.find(i=>i.id==id && i.userId==userId);
        if(cartItemIndex==-1){
            return "Item not found";

        } else{
            cartItems.splice(cartItemIndex,1)
        };
        
    }

}

var cartItems=[new cartItemModel(1,1,3,1)];