import { NextResponse } from 'next/server'
import connectDB from '../../../lib/mongodb'
import Product from '../../../models/Product'
import ImageKit from 'imagekit'

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export async function POST(request) {
  try {
    await connectDB()

    const formData = await request.formData()
    const name = formData.get('name')
    const description = formData.get('description')
    const imageFile = formData.get('image')

    if (!name || !description || !imageFile) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to ImageKit
    const uploadResponse = await new Promise((resolve, reject) => {
      imagekit.upload({
        file: buffer,
        fileName: `${Date.now()}-${imageFile.name}`,
        folder: '/products',
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    const product = new Product({
      name,
      description,
      image: uploadResponse.url,
      createdAt: new Date()
    });

    await product.save()

    return NextResponse.json({ 
      message: 'Product added successfully',
      product 
    })

  } catch (error) {
    console.error('Error in product upload:', error);
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    )
  }
}
// Get all products or search
export async function GET(request) {
  try {
    await connectDB()

    // Get search query from URL
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    let query = {}
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }
    }

    const products = await Product.find(query).sort({ createdAt: -1 })
    return NextResponse.json(products)

  } catch (error) {
    console.error('Error in GET /api/products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// Optional: Add DELETE method for admin to remove products
export async function DELETE(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Check if admin is logged in (you might want to add proper authentication)
    const isAdminLoggedIn = request.cookies.get('isAdminLoggedIn')
    if (!isAdminLoggedIn) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      message: 'Product deleted successfully' 
    })

  } catch (error) {
    console.error('Error in DELETE /api/products:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}